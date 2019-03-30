
var http = require('http')
var url = require('url')

function score(courseId)
{
	var result
	switch(courseId)
	{
		case "cs551":
			result = 
				[
					{"Course ID" : "CS551", "Homework ID" : 1, "Score" : "84"},
					{"Course ID" : "CS551", "Homework ID" : 2, "Score" : "93"},
					{"Course ID" : "CS551", "Homework ID" : 3, "Score" : "88"}
				]
			break
		case "cs557":
			result = 
				[
					{"Course ID" : "CS557", "Homework ID" : 1, "Score" : "90"},
					{"Course ID" : "CS557", "Homework ID" : 2, "Score" : "85"}
				]
			break
		default:
			break
	}
	return result
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var courseId = parsedUrl.query.course_id
  var result
  
  if (/^\/api\/score/.test(req.url))
    result = score(courseId)
  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
