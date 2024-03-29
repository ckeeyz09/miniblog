

//CONSTRUCTORS

var $newStatus = $("#status-modal-form");
var statusTemplate = _.template($("#status-template").html());

var User = function (name, handle, age, location, image) {
  this.name = name;
  this.handle = handle;
  this.age = age;
  this.location = location;
  this.userImage = image;
  this.post = localStorage.getItem("post");
  this.key = "post";
}

var Status = function (image, game, status) {
  this.postImage = image;
  this.game = game;
  this.status = status;
  this.items = localStorage.getItem("status");
  this.key = "status";
}

Status.all = [];

//For use at a later date
// var Company = function (name, location, size, titles, image) {
//   this.name = name;
//   this.location = location;
//   this.size = size;
//   this.titles = titles;
//   this.image = image;
// }

// var Developer = function (name, job, company, current_project) {
//   this.name = name;
//   this.job = job;
//   this.company = company;
//   this.project = current_project;
// }

//LOCAL STORAGE

// function SaveRender() {}

Status.prototype.saveToLs = function (input) {

  if (this.items) {
    items_json = JSON.parse(this.items)
  }
  else {
    items_json = [];
  }
  items_json.push(input);

  localStorage.setItem(this.key, JSON.stringify(items_json));
  // Status.all.push(this);
}

//RENDER TO TEMPLATE

Status.prototype.render = function(template_source, where) {

  var items_json = JSON.parse(this.items);
  var template = _.template($(template_source).html());

  _.each(items_json, function(item){
    $(where).append(template(item));
  });



  // var index = Status.all.indexOf(this);
  // var $status = $(statusTemplate(this));
  // $status.attr("data-index", index);
  // $statusList.append($status);
}

// Status.prototype = new SaveRender();
// Status.prototype.constructor = Status;
  var statusImage = $("#new-image").val();
  var statusGame = $("#new-game").val();
  var statusBody = $("#new-body").val();
  var newStatus = new Status(statusImage, statusGame, statusBody);


//MODAL SUBMIT FUNCTION
$newStatus.on("submit", function() {
  event.preventDefault();
  // var statusImage = $("#new-image").val();
  // var statusGame = $("#new-game").val();
  // var statusBody = $("#new-body").val();
  // var newStatus = new Status(statusImage, statusGame, statusBody);

  newStatus.saveToLs(newBook);
  newStatus.render('#book-template', '#book-container');

  console.log(Status.all);

  $newStatus[0].reset();
  $.modal('hide');
}
