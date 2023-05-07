import { InstanceElement, SeriesElement, SeriesList } from '@zhiva/types';
import { Drawer } from '@zhiva/ui-components';
import { RefObject } from 'react';
import SeriesPreview from './SeriesPreview';
import { DrawerWidths } from '@zhiva/shared/constants';

/* eslint-disable-next-line */
export interface SeriesDrawerProps {
  series: SeriesList;
  showDrawer: boolean;
  containerRef: RefObject<HTMLDivElement>;
  selectedSeries: string[];
  onSelectSeries: (seriesUID: string) => void;
}

export function SeriesDrawer({
  series,
  showDrawer = false,
  containerRef,
  selectedSeries,
  onSelectSeries,
}: SeriesDrawerProps) {
  const sortedSeries: [string, SeriesElement][] = Array.from(
    series.entries()
  ).sort(
    ([aKey, aVal], [bKey, bVal]) =>
      Number(aVal.SeriesNumber) - Number(bVal.SeriesNumber) || 0
  );

  const seriesSelectors = sortedSeries.map(([seriesKey]) => {
    return () => {
      onSelectSeries(seriesKey);
    };
  });

  return (
    <Drawer
      showDrawer={showDrawer}
      width={DrawerWidths.SERIES}
      containerRef={containerRef}
    >
      {sortedSeries.map(([seriesKey, series], index) => {
        const instanceNumber = Number.parseInt(
          String(series.instances.size / 2)
        );
        const selectedInstance = series.instances.get(
          Array.from(series.instances.keys())[
            instanceNumber === 1 ? 0 : instanceNumber
          ]
        ) as InstanceElement;
        return (
          series.instances &&
          series.instances.size > 0 && (
            <SeriesPreview
              key={series.SeriesInstanceUID}
              instance={selectedInstance}
              numberOfInstances={series.instances.size}
              onClick={seriesSelectors[index]}
              isSelected={selectedSeries.includes(series.SeriesInstanceUID)}
            />
          )
        );
      })}
    </Drawer>
  );
}

export default SeriesDrawer;
