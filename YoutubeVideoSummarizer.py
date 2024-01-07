from flask import Flask, jsonify, request
from langchain.utilities import SQLDatabase
from snowflake.snowpark import Session
from langchain.chains import create_sql_query_chain
from sqlalchemy.engine import URL
from langchain.document_loaders import YoutubeLoader
from langchain.llms import OpenAI
from langchain.chains.summarize import load_summarize_chain
import json
from langchain.text_splitter import RecursiveCharacterTextSplitter

import os


app = Flask(__name__)


@app.route('/api/summarize/', methods=['POST'])
def process_text():
    try:
        data = request.get_json()
        user_text = data.get('link', '')
        loader = YoutubeLoader.from_youtube_url(
            user_text,
            add_video_info=True)
        result = loader.load()
        llm = OpenAI(temperature=0)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=0)
        texts = text_splitter.split_documents(result)
        chain = load_summarize_chain(llm, chain_type="map_reduce", verbose=False)
        summary = chain.run(texts)
        return jsonify({
            'summary': summary,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
