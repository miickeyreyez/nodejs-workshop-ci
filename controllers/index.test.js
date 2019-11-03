const { PokemonController } = require('.');
const PokemonModule = require('../modules');

jest.mock('../modules');

const body = {
  type: 'electric',
  name: 'Pikachu',
  id: 25,
  url_image: 'no image',
};

describe('Controller::Pokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const send = jest.fn();

  it('should add a Pokemon', async () => {
    const req = {
      body,
    };

    const res = {
      send,
    };

    PokemonModule.default.add
      .mockReturnValue(Promise.resolve({
        addedPokemon: body,
        existent: false,
      }));

    await PokemonController.addPokemon(req, res);

    const [response] = res.send.mock.calls[0];

    expect(res.send).toHaveBeenCalledWith(response);
  });

  it('shouldn`t add an existent Pokemon', async () => {
    const req = {
      body,
    };

    const res = {
      send,
    };

    PokemonModule.default.add
      .mockReturnValue(Promise.resolve({
        addedPokemon: body,
        existent: true,
      }));

    await PokemonController.addPokemon(req, res);

    const [response] = res.send.mock.calls[0];

    expect(res.send).toHaveBeenCalledWith(response);
  });

  it('shouldn`t add an existent Pokemon', async () => {
    const req = {
      body,
    };

    const res = {
      status: () => ({
        send,
      }),
    };

    PokemonModule.default.add
      .mockReturnValue(Promise.resolve({
        addedPokemon: undefined,
      }));

    await PokemonController.addPokemon(req, res);

    const [error] = res.status().send.mock.calls[0];

    expect(typeof error).toBe('object');
  });
});
