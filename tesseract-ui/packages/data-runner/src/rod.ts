export async function ROD<T>(route: string, tag: string): Promise<{ data: T; tag: string }> {
  const res = await fetch(route, { cache: 'no-store' });
  const data = await res.json();
  return { data, tag };
}

