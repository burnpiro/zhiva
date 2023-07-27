import { StudiesList, InstanceMetadata } from '@zhiva/utils';

export function parseFilesToStudies(
  loadedFiles: Map<string, InstanceMetadata>
): StudiesList {
  const studies = new Map();

  for (const [fileName, fileValue] of loadedFiles) {
    if (studies.has(fileValue.StudyInstanceUID)) {
      const study = studies.get(fileValue.StudyInstanceUID);

      if (!study.Modalities.includes(fileValue['Modality'])) {
        study.Modalities = [...study.Modalities, fileValue['Modality']];
      }

      if (study.series.has(fileValue.SeriesInstanceUID)) {
        const series = study.series.get(fileValue.SeriesInstanceUID);

        if (series.instances.has(fileValue.SOPInstanceUID)) {
        } else {
          series.instances.set(
            fileValue.SOPInstanceUID,
            structuredClone(fileValue)
          );
        }
      } else {
        study.series.set(fileValue.SeriesInstanceUID, {
          AngioFlag: fileValue['AngioFlag'],
          BodyPartExamined: fileValue['BodyPartExamined'],
          Columns: fileValue['Columns'],
          InstitutionAddress: fileValue['InstitutionAddress'],
          InstitutionName: fileValue['InstitutionName'],
          InstitutionalDepartmentName: fileValue['InstitutionalDepartmentName'],
          MRAcquisitionType: fileValue['MRAcquisitionType'],
          Manufacturer: fileValue['Manufacturer'],
          ManufacturerModelName: fileValue['ManufacturerModelName'],
          Modality: fileValue['Modality'],
          PatientAge: fileValue['PatientAge'],
          PatientSize: fileValue['PatientSize'],
          PatientWeight: fileValue['PatientWeight'],
          PixelRepresentation: fileValue['PixelRepresentation'],
          PixelSpacing: fileValue['PixelSpacing'],
          ReferringPhysicianName: fileValue['ReferringPhysicianName'],
          Rows: fileValue['Rows'],
          ScanningSequence: fileValue['ScanningSequence'],
          SequenceName: fileValue['SequenceName'],
          SequenceVariant: fileValue['SequenceVariant'],
          SeriesDate: fileValue['SeriesDate'],
          SeriesDescription: fileValue['SeriesDescription'],
          SeriesInstanceUID: fileValue['SeriesInstanceUID'],
          SeriesNumber: fileValue['SeriesNumber'],
          TimezoneOffsetFromUTC: fileValue['TimezoneOffsetFromUTC'],
          WindowCenter: fileValue['WindowCenter'],
          WindowWidth: fileValue['WindowWidth'],
          instances: new Map([
            [fileValue.SOPInstanceUID, structuredClone(fileValue)],
          ]),
        });
      }
    } else {
      studies.set(fileValue.StudyInstanceUID, {
        StudyDate: fileValue['StudyDate'],
        StudyDescription: fileValue['StudyDescription'],
        StudyID: fileValue['StudyID'],
        StudyInstanceUID: fileValue['StudyInstanceUID'],
        Modalities: [fileValue['Modality']],
        series: new Map([
          [
            fileValue.SeriesInstanceUID,
            {
              AngioFlag: fileValue['AngioFlag'],
              BodyPartExamined: fileValue['BodyPartExamined'],
              Columns: fileValue['Columns'],
              InstitutionAddress: fileValue['InstitutionAddress'],
              InstitutionName: fileValue['InstitutionName'],
              InstitutionalDepartmentName:
                fileValue['InstitutionalDepartmentName'],
              MRAcquisitionType: fileValue['MRAcquisitionType'],
              Manufacturer: fileValue['Manufacturer'],
              ManufacturerModelName: fileValue['ManufacturerModelName'],
              Modality: fileValue['Modality'],
              PatientAge: fileValue['PatientAge'],
              PatientSize: fileValue['PatientSize'],
              PatientWeight: fileValue['PatientWeight'],
              PixelRepresentation: fileValue['PixelRepresentation'],
              PixelSpacing: fileValue['PixelSpacing'],
              ReferringPhysicianName: fileValue['ReferringPhysicianName'],
              Rows: fileValue['Rows'],
              ScanningSequence: fileValue['ScanningSequence'],
              SequenceName: fileValue['SequenceName'],
              SequenceVariant: fileValue['SequenceVariant'],
              SeriesDate: fileValue['SeriesDate'],
              SeriesDescription: fileValue['SeriesDescription'],
              SeriesInstanceUID: fileValue['SeriesInstanceUID'],
              SeriesNumber: fileValue['SeriesNumber'],
              TimezoneOffsetFromUTC: fileValue['TimezoneOffsetFromUTC'],
              WindowCenter: fileValue['WindowCenter'],
              WindowWidth: fileValue['WindowWidth'],
              instances: new Map([
                [fileValue.SOPInstanceUID, structuredClone(fileValue)],
              ]),
            },
          ],
        ]),
      });
    }
  }

  for (const [studyKey, study] of studies) {
    for (const [seriesKey, series] of studies.get(studyKey).series) {
      studies.get(studyKey).series.get(seriesKey).imageIds = Array.from(
        studies.get(studyKey).series.get(seriesKey).instances.values()
      )
        .sort((a: any, b: any) => Number(a.InstanceNumber) - Number(b.InstanceNumber))
        .map(
          // @ts-ignore
          (el) => el.imageId
        ) as string[];
    }
  }

  return studies;
}
