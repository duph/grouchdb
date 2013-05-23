require './couch.rb'

#Setup GrouchDB view on a CouchDB server
module Grouch
	class Server < Couch::Server
		#Creates an instance of with basic CouchDB commands and .
		def initialize host, port, options = nil
			@cdb_server = Couch::Server.new host, port, options
		end

		#Generates design/design.json from files design/type_viewname.js 
		def generate_design
			#TODO implement
		end

		#Uploads design.json to database db_name
		def upload_design db_name
			#TODO implement

			# Pseudocode
			#doc = read /design.json
			#cdb_server.put db_name/_design/grouch/ doc 
		end
	end
end

server = Grouch::Server.new "localhost", 5984
server.generate_design
server.upload_design ARGV[0]