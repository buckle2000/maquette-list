import './app.styl'

console.clear()

import 'web-animations-js' // polyfill
import { h, createProjector } from 'maquette'
const projector = createProjector()

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const app = {
    list: [],
    flipping: new Flipping(),
    addRandom() {
        this.flipping.read()
        for (let i = 0; i < 5; ++i) {
            this.list.push(window.crypto.getRandomValues(new Uint32Array(1))[0])
        }
        projector.renderNow()
        this.flipping.flip()
    },
    removeRandom() {
        this.flipping.read()
        for (let i = 0; i < 5; ++i) {
            this.list.splice(Math.floor(Math.random() * this.list.length), 1)
        }
        projector.renderNow()
        this.flipping.flip()
    },
    sort() {
        this.flipping.read()
        this.list.sort((a,b)=> a-b)
        projector.renderNow()
        this.flipping.flip()
    },
    shuffle() {
        this.flipping.read()
        shuffleArray(this.list)
        projector.renderNow()
        this.flipping.flip()
    },
    render() {
        return h('div#root', [
            h('div', [
                h('button', { onclick: evt => { this.addRandom() } }, ['Add']),
                h('button', { onclick: evt => { this.removeRandom() } }, ['Remove']),
                h('button', { onclick: evt => { this.sort() } }, ['Sort']),
                h('button', { onclick: evt => { this.shuffle() } }, ['Shuffle']),
            ]),
            h('ul#list', this.list.map(n =>
                h('li', { key: n, 'data-flip-key': n.toString() }, [n.toString()])))
        ])
    }
}

projector.replace(document.querySelector('div#root'), () => app.render())