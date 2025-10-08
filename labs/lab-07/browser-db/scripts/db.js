//implement this file

let _adapter = null;
let _doc = null;

export const uid = () => crypto.randomUUID().slice(0, 8);

export async function boot() {
    if (!_adapter) throw new Error("No adapter set. Call useAdapter(...) first.");
    _doc = await _adapter.load();
    return _doc;
}

export async function insertOne(col, data) {
    const d = getDoc();
    const rec = { id: uid(), ...data };
    d[col].push(rec);
    await _adapter.save(d);
    _doc = d;
    return rec;
}

export function getDoc() {
    return structuredClone(_doc);
}

export function findMany(col, pred = () => true) {
    return getDoc()[col].filter(pred);
}

export function findOne(col, pred) {
    return getDoc()[col].find(pred) || null;
}

export async function updateOne(col, id, patch) {
    const d = getDoc();
    const i = d[col].findIndex(r => r.id === id);
    if (i === -1) return 0;
    d[col][i] = { ...d[col][i], ...patch };
    await _adapter.save(d);
    _doc = d;
    return 1;
}

export async function deleteOne(col, id) {
    const d = getDoc();
    const before = d[col].length;
    d[col] = d[col].filter(r => r.id !== id);
    const deleted = before - d[col].length;
    if (deleted) {
        await _adapter.save(d);
        _doc = d;
    }

    return deleted;
}

export function useAdapter(adapter) {
    _adapter = adapter;
}
