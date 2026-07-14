import type { HttpMethod } from '@/types/endpoint';

export default function getMethodColor(method: HttpMethod) {
  switch (method) {
    case 'get':
      return 'border-green-500 text-green-500';
    case 'post':
      return 'border-orange-500 text-orange-500';
    case 'put':
      return 'border-blue-500 text-blue-500';
    case 'delete':
      return 'border-red-500 text-red-500';
    case 'patch':
      return 'border-purple-500 text-purple-500';
    case 'options':
      return 'border-gray-500 text-gray-500';
    case 'head':
      return 'border-slate-500 text-slate-500';
    case 'trace':
      return 'border-yellow-500 text-yellow-500';
  }
}
