import claimStatus from './claimStatus';
export default options = [
  {label: 'Non Traité', value: claimStatus.UNPROCESSED},
  {label: 'En Cours', value: claimStatus.IN_PROGRESS},
  {label: 'Résolu', value: claimStatus.RESOLVED},
  {label: 'Non Résolu', value: claimStatus.NOT_RESOLVED},
];
export const lessOptions = [
  {label: 'En Cours', value: claimStatus.IN_PROGRESS},
  {label: 'Résolu', value: claimStatus.RESOLVED},
  {label: 'Non Résolu', value: claimStatus.NOT_RESOLVED},
];
