import log from '../logger';
import PokemonModule from '../modules';
import { actions, errors } from '../constants';

class PokemonController {
  static async getPokemon(req, res) {
    const { id } = req.params;

    const {
      get,
      found,
    } = actions;

    const {
      notFound,
    } = errors;

    const pokemon = await PokemonModule.find(id);

    log(get(id));

    if (pokemon) {
      log(found(pokemon));
      res.send({ pokemon });
    } else {
      res.status(404).send({ error: notFound(id) });
    }
  }

  static async getAllPokemon(req, res) {
    let { page } = req.params;

    page = page || 1;

    const {
      getAll,
      pokemonFound,
    } = actions;

    const {
      pokemonNotFound,
    } = errors;

    const pokemon = await PokemonModule.findAll(page);

    log(getAll(page));

    if (pokemon) {
      log(pokemonFound(page));
      res.send({ pokemon });
    } else {
      res.status(404).send({ error: pokemonNotFound(page) });
    }
  }

  static async addPokemon(req, res) {
    const {
      add,
      existent: existentAction,
    } = actions;

    const {
      addError,
    } = errors;

    const {
      url_image: urlImage,
      type,
      id,
      name,
    } = req.body;

    const pokemon = {
      url_image: urlImage,
      type,
      id,
      name,
    };

    const { addedPokemon, existent } = await PokemonModule.add(pokemon);

    if (addedPokemon || existent) {
      // eslint-disable-next-line no-unused-expressions
      !existent && log(add(addedPokemon));
      // eslint-disable-next-line no-unused-expressions
      existent && log(existentAction(addedPokemon));
      res.send({ pokemon: addedPokemon, existent });
    } else {
      res.status(500).send({ error: addError(pokemon) });
    }
  }

  static async updatePokemon(req, res) {
    const { id } = req.params;

    const {
      update,
    } = actions;

    const {
      updateError,
    } = errors;

    const {
      url_image: urlImage,
      type,
      name,
    } = req.body;

    const pokemon = {
      url_image: urlImage,
      type,
      id,
      name,
    };

    const { updatedPokemon } = await PokemonModule.update(pokemon);

    if (updatedPokemon) {
      log(update(updatedPokemon));
      res.send({ pokemon: updatedPokemon });
    } else {
      res.status(500).send({ error: updateError(pokemon) });
    }
  }

  static async deletePokemon(req, res) {
    const { id } = req.params;

    const {
      deleted,
    } = actions;

    const {
      deleteError,
    } = errors;

    const { deletedPokemon } = await PokemonModule.delete(id);

    if (deletedPokemon) {
      log(deleted(deletedPokemon));
      res.send({ pokemon: deletedPokemon });
    } else {
      res.status(500).send({ error: deleteError(id) });
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { PokemonController };
