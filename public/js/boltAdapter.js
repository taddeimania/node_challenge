;(function(){
  neo4j = neo4j.v1;
  let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "abcde"));
  let session = driver.session();
  session
   .run('MATCH (n:Domain) RETURN n')
   .subscribe({
     onNext: function(record) {
       console.log(record);
     },
     onCompleted: function() {
       console.log("closing session");
       session.close();
     }
   });

   let boltSocket = new WebSocket("ws://localhost:8080");
   boltSocket.onmessage = function(event) {
     console.log(JSON.parse(event.data));
   };
})();
