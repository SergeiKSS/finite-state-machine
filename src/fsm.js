class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
   constructor(config) {
        var stackfsm = [];
        this.config = config;
        if (this.config == undefined){
            throw new Error('config = undefined');
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
    changeState(state) {
        for (var key in config.states){
            if (key == state){
                this.stackfsm.push(state);
                return true;
                };
            };   
        throw new Error('state is not exist');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
       var count = 0;
        for (var key in this.config.states[this.stackfsm[this.stackfsm.length-1]].transitions){
            if (key == event){
                this.stackfsm.push(key);
                this.stackfsm.push(this.config.states[this.stackfsm[this.stackfsm.length-2]].transitions[key]);
                count++;
            };
        };
        if (count == 0){
            throw new Error('event in current state is not exist');
        };
                       
    }
    
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
        var st = [], n;
        if (event == undefined){
            for (var key in config.states){
                st.push(String(key));
           };
           return st; 
        };
        for (var key in config.states){
            for (var key2 in config.states[key].transitions){
                if (key2 == event){
                    st.push(String(key));
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
