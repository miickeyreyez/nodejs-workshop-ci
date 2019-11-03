import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import paginate from 'mongoose-pagination';
import log from '../logger';
import PokemonModel from '../models';
import { errors } from '../constants';

class PokemonModule {
  static async find(id) {
    let pokemon = [];

    const {
      getDBerror,
    } = errors;

    try {
      pokemon = await PokemonModel.find({ id }, null, { limit: 1 });
    } catch (error) {
      log(getDBerror(id, error.stack));
    }
    return pokemon[0];
  }

  static async findAll(page) {
    let pokemon = [];

    // Load dotenv
    dotenv.config();

    let {
      ITEMS_PAGINATION,
    } = process.env;

    const {
      getAllDBerror,
    } = errors;

    ITEMS_PAGINATION = parseInt(ITEMS_PAGINATION, 10);

    try {
      pokemon = await PokemonModel
        .find()
        .sort('id')
        .paginate(page, ITEMS_PAGINATION);
    } catch (error) {
      log(getAllDBerror(page, error.stack));
    }
    return pokemon;
  }

  static async add(pokemon) {
    const {
      addDBerror,
      existentPokemonError,
    } = errors;

    try {
      const newPokemon = new PokemonModel(pokemon);

      const { id } = newPokemon;

      const pokemonExists = await PokemonModule.find(id);

      let existent = false;

      if (pokemonExists) {
        log(existentPokemonError(id));
        existent = true;
      } else {
        await newPokemon.save();
      }

      return { addedPokemon: newPokemon, existent };
    } catch (error) {
      log(addDBerror(pokemon, error.stack));
      return { addedPokemon: undefined };
    }
  }

  static async update(pokemon) {
    const {
      updateDBerror,
      notFound,
    } = errors;

    try {
      let updatedPokemon = new PokemonModel(pokemon);

      // eslint-disable-next-line camelcase
      const { id, name, type, url_image } = updatedPokemon;

      const pokemonExists = await PokemonModule.find(id);

      if (!pokemonExists) {
        log(notFound(id));
        updatedPokemon = undefined;
      } else {
        await PokemonModel.updateOne(
          { id },
          { name, type, url_image },
        );
      }

      return { updatedPokemon };
    } catch (error) {
      log(updateDBerror(pokemon, error.stack));
      return { updatedPokemon: undefined };
    }
  }

  static async delete(id) {
    const {
      deleteDBerror,
      notFound,
    } = errors;

    try {
      const deletedPokemon = await PokemonModule.find(id);

      if (!deletedPokemon) {
        log(notFound(id));
      } else {
        await PokemonModel.findOneAndRemove({ id });
      }

      return { deletedPokemon };
    } catch (error) {
      log(deleteDBerror(id, error.stack));
      return { deletedPokemon: undefined };
    }
  }
}

export default PokemonModule;
