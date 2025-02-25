import mysql.connector

def connection(username, password, host, database):
    mydb = mysql.connector.connect(
        user=username,
        password=password,
        host=host,
        database=database
    )

    return mydb


def close(mydb):
    mydb.close()
    return "Database connection has been closed"


# Switch authentication to firebase
def authentication(username, password, dbu, dbp, host, dbn):

    print("Login is called")

    mydb = connection(dbu, dbp, host, dbn)
    print(mydb)
    cursor = mydb.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)
    myresult = cursor.fetchone()
    print(myresult)
    close(mydb)

    return myresult if myresult != None else None


def search_mentors(data, dbu, dbp, host, dbn):

    industry = data['industry']
    role = data['role']
    location = data['location']
    company = data['company']
    gen_desc = data['gen_desc']

    # The query logic definitely needs to be updated to be some sort of fuzzy search per se
    # Industry we need some sort of mapping
        # Ex) Product = PM, Product Innovation, PM Analyst, ...
    # Role definiteley same thing
        # Ex) Analyst = SWE1 = Associate in some companies, etc...
    # Location we need some sort of geosearch
    mydb = connection(dbu, dbp, host, dbn)
    cursor = mydb.cursor()

    if(company == '' and gen_desc == ''):

        query = f"SELECT * FROM mentors WHERE industry = '{industry}' AND role = '{role}' AND location = '{location}'"
        cursor.execute(query)
        # myresult = cursor.fetchall()
        print('passed this?')

        mentor_list = [dict((cursor.description[i][0], value) \
            for i, value in enumerate(row)) for row in cursor.fetchall()]

        # Here we will call the coresignal API
        if mentor_list == None:
            print("Calling CoreSignal API")
            return None
        
        return mentor_list
    
    else:

        print("Fix this use case")

    close(mydb)

        
    return 0
    



