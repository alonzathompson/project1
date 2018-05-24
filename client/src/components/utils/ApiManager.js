import superagent from 'superagent'

export default {

  get: (url, params, callback) => {
      superagent
      .get(url)
      .query(params)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log(err)
          callback(err, null)
          return
        }
        let confirmation = response.body.confirmation
        if(confirmation != "SUCCESS"){
          callback({message: response.body.message}, null)
        }
        callback(null, response.body)
      })
  },
  post: (url, body, callback) => {
    superagent
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if(err){
        console.log(err)
        callback(err, null)
        return
      }
      const confirmation = response.body.confirmation
      if(confirmation != "SUCCESS"){
        callback({message: response.body.message}, null)
        return
      }
      callback(null, response.body)
    })
  },
  put: () => {

  },
  delete: () => {

  }
}
