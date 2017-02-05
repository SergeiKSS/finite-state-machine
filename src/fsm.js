class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
       var stackfsm = [];
        this.config = config;
        if (this.config == undefined){
            throw new Error('config = undefined')
        };
         this.stackfsm = [null];
         this.stackfsm.push(this.config.initial);
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stackfsm[this.stackfsm.length-1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {}

    /**
     * Resets FSM state to initial.
     */
    reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var st = [];
        if (event == undefined){
            for (var key in config.states){
                st.push(key);
           };
           return st; 
        };
        for (var key in config.states){
            for (var key2 in config.states[key].transitions){
                if (key2 == event){
                    st.push(key);
                };
            };   
        };
        return st;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
