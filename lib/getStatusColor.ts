export function getStatusColor(status: string) {
  if (status.startsWith('2')) return 'text-green-500';
  if (status.startsWith('3')) return 'text-blue-500';
  if (status.startsWith('4')) return 'text-yellow-500';
  if (status.startsWith('5')) return 'text-red-500';

  return 'text-gray-500';
}
