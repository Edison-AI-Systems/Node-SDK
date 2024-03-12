import icon from './icon.svg';
const { Node } = await modular.require('@edisonai/nodemap/node');

export default class HelloWorld extends Node {

    /*  These enable hot module replacement.
        Delete when done editing */
    static _version = 'hello_world';
    static _hotupdate = true;

    static template = {

        name: "Hello World",
        category: "Misc",
        color: "rgba(255, 248, 128, 0.8)",
        icon: icon,

        inputs: [{}],
        outputs: [{}],

        settings: {

            showLogs: true,
            
            planet: 'earth',
            name: 'Maxibillion',
            age: 43,
            alive: true,
        },

        gui: [
            { type: 'dropdown', name: 'planet', setting: 'planet', values: ['venus', 'earth', 'mars'], events: { change: 'planetChange' } },
            { type: 'text', setting: 'name', placeholder: 'Name',  events: { change: 'nameChange' } },
            { type: 'range', name: 'age', setting: 'age', minValue: 0, maxValue: 150, step: 1,  events: { change: 'ageChange' } },
            { type: 'checkbox', name: 'alive', setting: 'alive',  events: { change: 'aliveChange' } },
        ]
    }

    constructor(node, options) {
        super(node, options);
    }

    planetChange() {
        this.clearLogs();
        this.log(this.settings.planet);
    }

    nameChange() {
        this.clearLogs();
        this.log(this.settings.name);
    }

    ageChange() {
        this.clearLogs();
        this.log(this.settings.age);
    }

    // Called automatically
    main(caller, value) {
        this.inputs[0].clear();
        this.outputs[0].send(value);
    }
}