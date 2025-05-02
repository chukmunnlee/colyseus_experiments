extends Control

const colyseus = preload("res://addons/godot_colyseus/lib/colyseus.gd")

@onready var usernameCtrl = $VBoxContainer/username/usernameCtrl
@onready var roomCtrl = $VBoxContainer/room/roomCtrl
@onready var createBtn = $VBoxContainer/buttons/createBtn
@onready var joinBtn = $VBoxContainer/buttons/joinBtn
@onready var status = $VBoxContainer/header/status

const LOG = "[%s]: username=%s, room=%s"
var state: GameManager.ChatRoomData
var room: colyseus.Room

func _ready():
	createBtn.connect("pressed", _on_createBtn)
	joinBtn.connect("pressed", _on_joinBtn)
	
func _on_createBtn():
	var _username = usernameCtrl.text
	var _roomName = roomCtrl.text
	status.text = "(connecting....)"
	print(LOG % [ "CREATE", _username, _roomName ])
	var _promise = GameManager.create_room(_username, _roomName)
	print(">>>> _promise: ", _promise)
	await _promise.completed
	print(">>> get state: ", _promise.get_state() == _promise.State.Failed)
	if (_promise.get_state() == _promise.State.Failed):
		print("Failed")
		return
	state.on_state_change.on("_on_state_change")
	
	
func _on_joinBtn():
	print(LOG % [ "JOIN", usernameCtrl.text, roomCtrl.text ])
	
func _on_state_change(state):
	print(">>>> on_state_change: ", state)
