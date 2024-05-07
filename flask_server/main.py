import sqlite3
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route("/addjob", methods=["POST"])
def route_addjob():
    data = request.get_json()
    db = sqlite3.connect("sqlite.db")
    db.cursor().execute("INSERT INTO AddJob (email,jobTitle,category, priceRange, shortDescription,deadline) VALUES (?,?,?,?,?,?)",(data["email"],data["jobTitle"],data["category"], data["priceRange"],data["shortDescription"],data["deadline"]))
    db.commit()
    db.close()
    
    return {"email":data["email"],"jobTitle":data["jobTitle"],"category":data["category"], "priceRange":data["priceRange"], "shortDescription":data["shortDescription"],"deadline" : data["deadline"]},201
  
@app.route("/bidjob", methods=["POST"])
def route_bidjob():
    data = request.get_json()
    db = sqlite3.connect("sqlite.db")
    db.cursor().execute("INSERT INTO BidJob (jobid,ownerEmail,userEmail,price,deadline,jobTitle,statuss) VALUES (?,?,?,?,?,?,?)",(data["jobid"],data["ownerEmail"],data["userEmail"], data["price"],data["deadline"],data["jobTitle"],data["statuss"]))
    db.commit()
    db.close()
    
    return {"jobid":data["jobid"],"ownerEmail":data["ownerEmail"],"userEmail":data["userEmail"],"price":data["price"],"deadline":data["deadline"],"jobTitle":data["jobTitle"],"statuss":data["statuss"]},201
  
    
@app.route("/alljob",methods=["GET"])
def route_allJob():
    db = sqlite3.connect("sqlite.db")
    data = db.cursor().execute("SELECT * FROM AddJob").fetchall()
    db.commit()
    db.close()
    # return {"stations":data}
    if data:
        job = [{"id" : row[0],"email": row[1], "jobTitle": row[2], "category": row[3],"priceRange":row[4],"shortDescription":row[5],"deadline":row[6]} for row in data]
        return jsonify(job), 200
    
@app.route("/job/<int:id>",methods=["GET"])
def route_Job(id):
    db = sqlite3.connect("sqlite.db")
    data = db.cursor().execute("SELECT * FROM AddJob where id = ?",(id,)).fetchone()
    db.commit()
    db.close()
    job = {"id" : data[0],"email": data[1], "jobTitle": data[2], "category": data[3],"priceRange":data[4],"shortDescription":data[5],"deadline":data[6]}
    return jsonify(job), 200
 
@app.route("/mypostedjob/<string:Email>",methods=["GET"])
def route_mypostedJob(Email):
    db = sqlite3.connect("sqlite.db")
    data = db.cursor().execute("SELECT * FROM AddJob where email = ?", (Email,)).fetchall()
    db.commit()
    db.close()
    # return {"stations":data}
    if data:
        mypostedjob = [{"id" : row[0],"email": row[1], "jobTitle": row[2], "category": row[3],"priceRange":row[4],"shortDescription":row[5],"deadline":row[6]} for row in data]
        return jsonify(mypostedjob), 200
    
  

@app.route("/mybidjob/<string:Email>",methods=["GET"])
def route_mybid(Email):
    db = sqlite3.connect("sqlite.db")
    data = db.cursor().execute("SELECT * FROM BidJob where userEmail = ?", (Email,)).fetchall()
    db.commit()
    db.close()
    # return {"stations":data}
    if data:
        bidjob = [{"id": row[0], "jobid": row[1], "ownerEmail": row[2],"userEmail":row[3],"price":row[4],"deadline":row[5], "jobTitle": row[6], "statuss":row[7]} for row in data]
        return jsonify(bidjob), 200

@app.route("/bidrequest/<string:Email>",methods=["GET"])
def route_bidrequest(Email):
    db = sqlite3.connect("sqlite.db")
    data = db.cursor().execute("SELECT * FROM BidJob where ownerEmail = ?", (Email,)).fetchall()
    db.commit()
    db.close()
    # return {"stations":data}
    if data:
        bidjob = [{"id": row[0], "jobid": row[1], "ownerEmail": row[2],"userEmail":row[3],"price":row[4],"deadline":row[5], "jobTitle": row[6], "statuss":row[7]} for row in data]
        return jsonify(bidjob), 200

@app.route("/statusUpdate/<int:id>",methods=["PATCH"])
def route_updateStatus(id):
    data = request.get_json()
    db = sqlite3.connect("sqlite.db")
    db.cursor().execute("UPDATE BidJob SET statuss = ? WHERE id = ?", (data["statuss"], id))
    db.commit()
    db.close()
    # return {"stations":data}
    return jsonify(data), 200

@app.route("/jobupdate/<int:id>",methods=["PUT"])
def route_jobupdate(id):
    data = request.get_json()
    db = sqlite3.connect("sqlite.db")
    db.cursor().execute("UPDATE AddJob SET email = ?, jobTitle = ?, category = ?, priceRange = ?, shortDescription = ?, deadline = ? WHERE id = ?", (data["email"], data["jobTitle"], data["category"], data["priceRange"], data["shortDescription"], data["deadline"], id))
    db.commit()
    db.close()
    # return {"stations":data}
    return jsonify(data), 200
@app.route("/jobdelete/<int:id>", methods=["DELETE"])
def route_jobdelete(id):
    db = sqlite3.connect("sqlite.db")
    cursor = db.cursor()
    cursor.execute("DELETE FROM AddJob WHERE id = ?", (id,))
    db.commit()
    db.close()
    return jsonify({"message": "Job deleted successfully"}), 200







if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)