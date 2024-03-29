$(function() {



var $postList = $("#post-list");
var $newStatus = $("#status-modal-form");
var statusTemplate = _.template($("#status-template").html());

var Status = function (image, game, status) {
  this.image = image;
  this.game = game;
  this.status = status;
  this.items = localStorage.getItem("status");
  this.key = "status";
}

Status.all = [];

Status.prototype.saveToLs = function (input) {

  if (this.items) {
    items_json = JSON.parse(this.items)
  }
  else {
    items_json = [];
  }
  items_json.push(input);

  localStorage.setItem(this.key, JSON.stringify(items_json));
}

Status.prototype.render = function(template_source, where) {

  var items_json = JSON.parse(this.items);
  var template = _.template($(template_source).html());

  _.each(items_json, function(item) {
    $(where).append(template(item));
  });

}


$newStatus.on("submit", function() {
  event.preventDefault();
  var statusImage = $("#new-image").val();
  var statusGame = $("#new-game").val();
  var statusBody = $("#new-body").val();
  var newStatus = new Status(statusImage, statusGame, statusBody);

  newStatus.saveToLs(newStatus);
  newStatus.render('#status-template', '#status-container');

});


});