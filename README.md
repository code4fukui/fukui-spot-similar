# fukui-spot-similar

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web application that finds similar and dissimilar tourist spots in Fukui, Japan, based on the semantic similarity of their text descriptions.

## Demo

**[https://code4fukui.github.io/fukui-spot-similar/](https://code4fukui.github.io/fukui-spot-similar/)**

The application displays a main tourist spot and then lists the top 3 most similar and dissimilar spots, allowing for interesting discoveries.

## Features

- Analyzes Japanese text descriptions of tourist spots using OpenAI's `text-embedding-ada-002` model.
- Calculates cosine similarity to find the top 3 most similar and dissimilar spots for each location.
- Presents results in a simple, image-rich web interface.
- Features a dynamic header with a randomly selected background image from the dataset.

## How It Works

This project uses a pre-computation approach to provide fast results on a static website. The data processing is a two-step script:

1.  **Vector Generation (`make_vec_fukuispot.js`):** Tourist spot descriptions are fetched from the open data source and converted into numerical vectors (embeddings) using the OpenAI API. The results are saved to `fukui-spot_vec.csv`.
2.  **Similarity Calculation (`calc_vec_fukuispot.js`):** The script calculates the cosine similarity between every pair of spot vectors. For each spot, it identifies the top 3 most similar (highest similarity score) and top 3 most dissimilar (lowest similarity score) spots. This pre-calculated data is saved to `fukui-spot_vec_similar.csv`.
3.  **Frontend Display (`index.html`):** The static web page loads the final `fukui-spot_vec_similar.csv` and displays the pre-calculated relationships. No API calls or heavy computations are performed in the browser.

## Setup

To regenerate the data locally, follow these steps:

### Prerequisites

- [Deno](https://deno.land/) runtime
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Instructions

1.  Clone the repository.
2.  Create a `.env` file in the root directory and add your OpenAI API key:
    ```
    OPENAI_API_KEY=sk-...
    ```
3.  Run the data processing script. This will fetch the latest data, generate new vector embeddings, and calculate similarities.
    ```bash
    deno run -A make.js
    ```
    *(Note: For a more secure approach, use specific flags: `deno run --allow-net --allow-read --allow-write --allow-env make.js`)*
4.  Open `index.html` in your web browser to view the results.

## Data Sources

- **Tourist Spot Data:** [Fukui Tourism Spot Open Data](https://github.com/code4fukui/fukui-spot) (Data from [ふくいドットコム](https://www.fuku-e.com/), licensed under CC BY)
- **Text Vectorization:** [txt2vec library](https://github.com/code4fukui/txt2vec) using OpenAI's `text-embedding-ada-002` model.

## License

MIT License