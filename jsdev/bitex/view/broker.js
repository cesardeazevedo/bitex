goog.provide('bitex.view.BrokerView');
goog.require('bitex.view.View');

goog.require('bitex.templates');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.BrokerView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.BrokerView, bitex.view.View);



bitex.view.BrokerView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen(model, bitex.model.Model.EventType.SET + 'Broker', this.onModelSetBroker_);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.BrokerView.prototype.onModelSetBroker_ = function(e) {
  var broker = e.data;

  var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.PERCENT);
  fmt.setMaximumFractionDigits(2);
  fmt.setMinimumFractionDigits(2);

  broker['TransactionFeeBuy'] = fmt.format(broker['TransactionFeeBuy'] / 10000);
  broker['TransactionFeeSell'] = fmt.format(broker['TransactionFeeSell'] / 10000);

  goog.soy.renderElement(goog.dom.getElement('my_broker'), bitex.templates.BrokerView, {msg_broker:broker});
};