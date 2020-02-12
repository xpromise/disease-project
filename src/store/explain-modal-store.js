import { observable, action } from 'mobx';

class ExplainModalStore {
  @observable isShowExplainModal = false;

  constructor(isShowExplainModal) {
    this.isShowExplainModal = isShowExplainModal;
  }

  @action setIsShowExplainModal(isShowExplainModal) {
    this.isShowExplainModal = isShowExplainModal;
  }
}

export default new ExplainModalStore();
