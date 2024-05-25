
export function convertSnaps<T>(results: { docs: any[]; }) {
  return <T[]> results.docs.map(snap => {
    return {
      id: snap.id,
      ...<any> snap.data() as any
    };
  });
}
