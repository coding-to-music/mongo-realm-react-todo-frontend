import useStreetMutations from "./useStreetMutations";
import { useAllStreetsInProject } from "./useStreetQueries";

const useStreets = (project) => {
  const { streets, loading } = useAllStreetsInProject(project);
  const { addStreet, updateStreet } = useStreetMutations(project);
  return {
    loading,
    streets,
    updateStreet,
    addStreet,
  };
};
export default useStreets;
