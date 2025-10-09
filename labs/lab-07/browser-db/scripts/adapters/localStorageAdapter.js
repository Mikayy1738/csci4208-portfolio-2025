//implement this file

import { seedDoc } from "../model.js"

export class LocalStorageAdapter {
    #key
    #stampOnSave;
    #stamp(d) {
        d.rev = (d.rev ?? 0) + 1;
        d.updateAt = new Date().toISOString();
    }

    #seedAndSave() {
        const d = seedDoc();
        localStorage.setItem(this.#key, JSON.stringify(d));
        return d;
    }

    constructor({ key = "mockdb:doc", stampOnSave = true } = {}) {
        this.#key;
        this.#stampOnSave;
        this.load = this.load.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.snapshot = this.snapshot.bind(this);
    }

    async load() {
        try {
            const raw = localStorage.getItem(this.#key);
            return raw ? JSON.parse(raw) : this.#seedAndSave();
        } catch {
            return this.#seedAndSave();
        }
    }

    async save(next) {
        if (this.#stampOnSave) this.#stamp(next);
        localStorage.setItem(this.#key, JSON.stringify(next));
    }

    reset() {
        localStorage.removeItem(this.#key);
    }

    snapshot() {
        const raw = localStorage.getItem(this.#key);
        return raw ? JSON.parse(raw) : null;
    }

}

export const localStorageAdapter = new LocalStorageAdapter;