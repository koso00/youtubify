'use babel';

import youtubifyView from './youtubify-view';
import { CompositeDisposable } from 'atom';

export default {

  youtubifyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.youtubifyView = new youtubifyView(state.youtubifyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.youtubifyView.getElement(),
      visible: false
    });
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'youtubify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.youtubifyView.destroy();
  },

  serialize() {
    return {
      youtubifyViewState: this.youtubifyView.serialize()
    };
  },

  toggle() {
    document.getElementById("query").value = "";
    console.log('youtubify was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
