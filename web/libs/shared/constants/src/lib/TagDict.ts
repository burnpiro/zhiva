import {TagElement} from "../../../cornerstone/src/lib/extractInstanceData";

export const TAG_DICT: Record<
  string,
  TagElement
> = {
  '(0008,0005)': {
    tag: '(0008,0005)',
    vr: 'CS',
    vm: '1-n',
    name: 'SpecificCharacterSet',
  },
  '(0008,0008)': { tag: '(0008,0008)', vr: 'CS', vm: '2-n', name: 'ImageType' },
  '(0008,0012)': {
    tag: '(0008,0012)',
    vr: 'DA',
    vm: '1',
    name: 'InstanceCreationDate',
  },
  '(0008,0013)': {
    tag: '(0008,0013)',
    vr: 'TM',
    vm: '1',
    name: 'InstanceCreationTime',
  },
  '(0008,0016)': { tag: '(0008,0016)', vr: 'UI', vm: '1', name: 'SOPClassUID' },
  '(0008,0018)': {
    tag: '(0008,0018)',
    vr: 'UI',
    vm: '1',
    name: 'SOPInstanceUID',
  },
  '(0008,0020)': { tag: '(0008,0020)', vr: 'DA', vm: '1', name: 'StudyDate' },
  '(0008,0021)': { tag: '(0008,0021)', vr: 'DA', vm: '1', name: 'SeriesDate' },
  '(0008,0022)': {
    tag: '(0008,0022)',
    vr: 'DA',
    vm: '1',
    name: 'AcquisitionDate',
  },
  '(0008,0023)': { tag: '(0008,0023)', vr: 'DA', vm: '1', name: 'ContentDate' },
  '(0008,0050)': {
    tag: '(0008,0050)',
    vr: 'SH',
    vm: '1',
    name: 'AccessionNumber',
  },
  '(0008,0060)': { tag: '(0008,0060)', vr: 'CS', vm: '1', name: 'Modality' },
  '(0008,0061)': {
    tag: '(0008,0061)',
    vr: 'CS',
    vm: '1-n',
    name: 'ModalitiesInStudy',
  },
  '(0008,0070)': {
    tag: '(0008,0070)',
    vr: 'LO',
    vm: '1',
    name: 'Manufacturer',
  },
  '(0008,0080)': {
    tag: '(0008,0080)',
    vr: 'LO',
    vm: '1',
    name: 'InstitutionName',
  },
  '(0008,0081)': {
    tag: '(0008,0081)',
    vr: 'ST',
    vm: '1',
    name: 'InstitutionAddress',
  },
  '(0008,0090)': {
    tag: '(0008,0090)',
    vr: 'PN',
    vm: '1',
    name: 'ReferringPhysicianName',
  },
  '(0008,0201)': {
    tag: '(0008,0201)',
    vr: 'SH',
    vm: '1',
    name: 'TimezoneOffsetFromUTC',
  },
  '(0008,1030)': {
    tag: '(0008,1030)',
    vr: 'LO',
    vm: '1',
    name: 'StudyDescription',
  },
  '(0008,103E)': {
    tag: '(0008,103E)',
    vr: 'LO',
    vm: '1',
    name: 'SeriesDescription',
  },
  '(0008,1040)': {
    tag: '(0008,1040)',
    vr: 'LO',
    vm: '1',
    name: 'InstitutionalDepartmentName',
  },
  '(0008,1090)': {
    tag: '(0008,1090)',
    vr: 'LO',
    vm: '1',
    name: 'ManufacturerModelName',
  },
  '(0010,1010)': { tag: '(0010,1010)', vr: 'AS', vm: '1', name: 'PatientAge' },
  '(0010,1020)': { tag: '(0010,1020)', vr: 'DS', vm: '1', name: 'PatientSize' },
  '(0010,1021)': {
    tag: '(0010,1021)',
    vr: 'SQ',
    vm: '1',
    name: 'PatientSizeCodeSequence',
  },
  '(0010,1022)': {
    tag: '(0010,1022)',
    vr: 'DS',
    vm: '1',
    name: 'PatientBodyMassIndex',
  },
  '(0010,1023)': {
    tag: '(0010,1023)',
    vr: 'DS',
    vm: '1',
    name: 'MeasuredAPDimension',
  },
  '(0010,1024)': {
    tag: '(0010,1024)',
    vr: 'DS',
    vm: '1',
    name: 'MeasuredLateralDimension',
  },
  '(0010,1030)': {
    tag: '(0010,1030)',
    vr: 'DS',
    vm: '1',
    name: 'PatientWeight',
  },
  '(0018,0015)': {
    tag: '(0018,0015)',
    vr: 'CS',
    vm: '1',
    name: 'BodyPartExamined',
  },
  '(0018,0020)': {
    tag: '(0018,0020)',
    vr: 'CS',
    vm: '1-n',
    name: 'ScanningSequence',
  },
  '(0018,0021)': {
    tag: '(0018,0021)',
    vr: 'CS',
    vm: '1-n',
    name: 'SequenceVariant',
  },
  '(0018,0023)': {
    tag: '(0018,0023)',
    vr: 'CS',
    vm: '1',
    name: 'MRAcquisitionType',
  },
  '(0018,0024)': {
    tag: '(0018,0024)',
    vr: 'SH',
    vm: '1',
    name: 'SequenceName',
  },
  '(0018,0025)': { tag: '(0018,0025)', vr: 'CS', vm: '1', name: 'AngioFlag' },
  '(0018,0050)': {
    tag: '(0018,0050)',
    vr: 'DS',
    vm: '1',
    name: 'SliceThickness',
  },
  '(0020,000D)': {
    tag: '(0020,000D)',
    vr: 'UI',
    vm: '1',
    name: 'StudyInstanceUID',
  },
  '(0020,000E)': {
    tag: '(0020,000E)',
    vr: 'UI',
    vm: '1',
    name: 'SeriesInstanceUID',
  },
  '(0020,0010)': { tag: '(0020,0010)', vr: 'SH', vm: '1', name: 'StudyID' },
  '(0020,0011)': {
    tag: '(0020,0011)',
    vr: 'IS',
    vm: '1',
    name: 'SeriesNumber',
  },
  '(0020,0012)': {
    tag: '(0020,0012)',
    vr: 'IS',
    vm: '1',
    name: 'AcquisitionNumber',
  },
  '(0020,0013)': {
    tag: '(0020,0013)',
    vr: 'IS',
    vm: '1',
    name: 'InstanceNumber',
  },
  '(0020,0030)': {
    tag: '(0020,0030)',
    vr: 'DS',
    vm: '3',
    name: 'ImagePosition',
  },
  '(0020,0032)': {
    tag: '(0020,0032)',
    vr: 'DS',
    vm: '3',
    name: 'ImagePositionPatient',
  },
  '(0020,0035)': {
    tag: '(0020,0035)',
    vr: 'DS',
    vm: '6',
    name: 'ImageOrientation',
  },
  '(0020,0037)': {
    tag: '(0020,0037)',
    vr: 'DS',
    vm: '6',
    name: 'ImageOrientationPatient',
  },
  '(0020,0052)': {
    tag: '(0020,0052)',
    vr: 'UI',
    vm: '1',
    name: 'FrameOfReferenceUID',
  },
  '(0028,0010)': { tag: '(0028,0010)', vr: 'US', vm: '1', name: 'Rows' },
  '(0028,0011)': { tag: '(0028,0011)', vr: 'US', vm: '1', name: 'Columns' },
  '(0028,0030)': {
    tag: '(0028,0030)',
    vr: 'DS',
    vm: '2',
    name: 'PixelSpacing',
  },
  '(0028,0100)': {
    tag: '(0028,0100)',
    vr: 'US',
    vm: '1',
    name: 'BitsAllocated',
  },
  '(0028,0101)': { tag: '(0028,0101)', vr: 'US', vm: '1', name: 'BitsStored' },
  '(0028,0102)': { tag: '(0028,0102)', vr: 'US', vm: '1', name: 'HighBit' },
  '(0028,0103)': {
    tag: '(0028,0103)',
    vr: 'US',
    vm: '1',
    name: 'PixelRepresentation',
  },
  '(0028,0104)': {
    tag: '(0028,0104)',
    vr: 'US|SS',
    vm: '1',
    name: 'SmallestValidPixelValue',
  },
  '(0028,0105)': {
    tag: '(0028,0105)',
    vr: 'US|SS',
    vm: '1',
    name: 'LargestValidPixelValue',
  },
  '(0028,0106)': {
    tag: '(0028,0106)',
    vr: 'US|SS',
    vm: '1',
    name: 'SmallestImagePixelValue',
  },
  '(0028,0107)': {
    tag: '(0028,0107)',
    vr: 'US|SS',
    vm: '1',
    name: 'LargestImagePixelValue',
  },
  '(0028,0108)': {
    tag: '(0028,0108)',
    vr: 'US|SS',
    vm: '1',
    name: 'SmallestPixelValueInSeries',
  },
  '(0028,0109)': {
    tag: '(0028,0109)',
    vr: 'US|SS',
    vm: '1',
    name: 'LargestPixelValueInSeries',
  },
  '(0028,1050)': {
    tag: '(0028,1050)',
    vr: 'DS',
    vm: '1-n',
    name: 'WindowCenter',
  },
  '(0028,1051)': {
    tag: '(0028,1051)',
    vr: 'DS',
    vm: '1-n',
    name: 'WindowWidth',
  },
};
