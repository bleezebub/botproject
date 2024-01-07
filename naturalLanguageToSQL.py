from flask import Flask, jsonify, request
from langchain.utilities import SQLDatabase
from langchain.llms import OpenAI
from snowflake.snowpark import Session
from langchain.chains import create_sql_query_chain
from sqlalchemy.engine import URL
import json



app = Flask(__name__)


@app.route('/api/process_text', methods=['POST'])
def process_text():
    try:
        connection_parameters = {
            "account": account,
            "user": user,
            "password": password,
            "role": role,
            "warehouse": warehouse,
            "database": database,
            "schema": schema

        }

        session = Session.builder.configs(connection_parameters).create()

        connection_url = URL.create(
            "snowflake",
            username=user,
            password=password,
            host=account
        )
        snowflake_url = f"{connection_url}/{database}/{schema}?warehouse={warehouse}&role={role}"
        db = SQLDatabase.from_uri(snowflake_url, sample_rows_in_table_info=1, include_tables=None)
        llm = OpenAI(temperature=0, openai_api_key=openAPIKey)

        database_chain = create_sql_query_chain(llm, db)

        data = request.get_json()
        user_text = data.get('text', '')
        sql_query = database_chain.invoke({"question": user_text})
        print(sql_query)
        df_oil = session.sql(sql_query).to_pandas()

        return jsonify({
            'data': json.loads(df_oil.to_json(orient='records')),
            'sql query created': sql_query
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
