extends Node

const colyseus = preload("res://addons/godot_colyseus/lib/colyseus.gd")

var _client: colyseus.Client

class ChatText extends colyseus.Schema:
	static func define_fields():
		return [
			colyseus.Field.new("timestamp", colyseus.NUMBER, 0),
			colyseus.Field.new("userName", colyseus.STRING, ""),
			colyseus.Field.new("message", colyseus.STRING, "")
		]
	func _to_string():
		return "ChatText(timestamp=%d, userName=%s, message=%s)" \
			% [ self.timestamp, self.userName, self.message ]
	
class ChatRoomData extends colyseus.Schema:
	static func define_fields():
		return [
			colyseus.Field.new("roomId", colyseus.STRING, ""),
			colyseus.Field.new("roomName", colyseus.STRING, ""),
			colyseus.Field.new("historySize", colyseus.NUMBER, 0),
			colyseus.Field.new("userNames", colyseus.ARRAY, colyseus.STRING),
			#colyseus.Field.new("messages", colyseus.ARRAY, ChatText)
		]
		
	func _to_string():
		return "ChatRoomData(roomId=%s, roomName=%s, userNames=%s, messages=%s)" \
			% [ self.roomId, self.roomName, self.userNames, self.messages ]

func join_room(userName: String, roomId: String, server: String  = "ws://localhost:3000") -> colyseus.Promise:
	_client = colyseus.Client.new(server)
	var options = { "userName": userName}
	return _client.join_by_id(ChatRoomData, roomId, options)
	
func create_room(userName: String, roomName: String, server: String = "ws://localhost:3000") -> colyseus.Promise:
	var options = { "userName": userName, "roomName": roomName}
	_client = colyseus.Client.new(server)
	return _client.create(ChatRoomData, "chat", options)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
