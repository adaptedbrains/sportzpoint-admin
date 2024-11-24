import usePostStore from '../store/usePostStore';

export const useTags = () => {
  const { tags, loading, error, fetchTags } = usePostStore();
  return { tags, loading, error, fetchTags };
}; 