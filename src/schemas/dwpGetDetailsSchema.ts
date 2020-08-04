import * as Joi from 'joi';

export default {
  body: Joi.object().keys({
    cityName: Joi.string().required().regex
      (/^[a-zA-Z][0-9a-zA-Z .,'-]*$/)
  })
};
