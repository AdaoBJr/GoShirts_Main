import ApiError, { dataIsMissing } from '../../errors';

const hasData = async (resolve, parent, args, context, info) => {
  if (!args.data || !Object.values(args.data).length) ApiError(dataIsMissing);

  return await resolve(parent, args, context, info);
};

export default hasData;
