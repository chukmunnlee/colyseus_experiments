extends Control

@onready var usernameCtrl = $VBoxContainer/username/usernameCtrl
@onready var roomCtrl = $VBoxContainer/room/roomCtrl
@onready var createBtn = $VBoxContainer/buttons/createBtn
@onready var joinBtn = $VBoxContainer/buttons/joinBtn

const LOG = "[%s]: username=%s, room=%s"
func _ready():
	createBtn.connect("pressed", _on_createBtn)
	joinBtn.connect("pressed", _on_joinBtn)
	
func _on_createBtn():
	print(LOG % [ "CREATE", usernameCtrl.text, roomCtrl.text ])
	
func _on_joinBtn():
	print(LOG % [ "JOIN", usernameCtrl.text, roomCtrl.text ])
