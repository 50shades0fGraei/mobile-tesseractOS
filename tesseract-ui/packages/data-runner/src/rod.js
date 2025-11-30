export async function ROD(route, tag) {
    const res = await fetch(route, { cache: 'no-store' });
    const data = await res.json();
    return { data, tag };
}
