db.createUser(
    {
        user    : "user",
        pwd     : "user",
        roles   : [
            {
             role : "readWrite",
             db   : "expressjs_tut"
            }
        ]
    }
)