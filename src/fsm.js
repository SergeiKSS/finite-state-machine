class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var stackfsm = [],
            stackundo = [];
        this.stackundo = [null];    
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
        for (var key in this.config.states){
            if (key == state){
                this.stackfsm.push(null);
                this.stackfsm.push(state);
                this.stackundo.length = 1;
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
                if (this.stackundo.length > 1) {
                    this.stackundo.length=this.stackundo.length-2;   
                }
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
    reset() {
        this.stackfsm.length = 2;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var st = [];
        if (event == undefined){
            for (var key in this.config.states){
                st.push(String(key));
           };
        return st; 
        };
        for (var key in this.config.states){
            for (var key2 in this.config.states[key].transitions){
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
    undo() {

        if (this.stackfsm.length == 2){
            return false;
        }

        this.stackundo.push(this.stackfsm[this.stackfsm.length-1]); 
        this.stackfsm.length=this.stackfsm.length-1;
        this.stackundo.push(this.stackfsm[this.stackfsm.length-1]); 
        this.stackfsm.length=this.stackfsm.length-1;

        return true;
        
   }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.stackundo.length == 1){
            return false;
        }
        this.stackfsm.push(this.stackundo[this.stackundo.length-1]); 
        this.stackundo.length=this.stackundo.length-1;
        this.stackfsm.push(this.stackundo[this.stackundo.length-1]); 
        this.stackundo.length=this.stackundo.length-1;
       
        return true;     
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stackfsm.length = 2;
        this.stackundo.length = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
