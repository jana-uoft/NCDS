const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});


export async function list(req, res, next) {
  let result = await cloudinary.api.resources({ max_results: 500, tags: true });
  while (result.hasOwnProperty('next_cursor') && result.next_cursor){
    const nextResult = await cloudinary.api.resources({ max_results: 500, tags: true, next_cursor: result.next_cursor });
    result.next_cursor = nextResult.next_cursor ? nextResult.next_cursor : null;
    result.rate_limit_allowed = nextResult.rate_limit_allowed;
    result.rate_limit_reset_at = nextResult.rate_limit_reset_at;
    result.rate_limit_remaining = nextResult.rate_limit_remaining;
    result.resources = [...result.resources, ...nextResult.resources];
  }
  return res.status(200).json(result);
}

export async function update(req, res, next) {
  const { public_id, tags } = req.body;
  const resource = await cloudinary.api.update(public_id, {tags: tags});
  return res.status(200).json(resource);
}

export async function removeByTag(req, res, next) {
  const { tag } = req.body;
  const resources = await cloudinary.api.delete_resources_by_tag(tag);
  return res.status(200).json(resources);
}

export async function create(req, res, next) {
  const { images } = req.body;
  let uploadedImages = [];
  for (let {file, tags} of images){
    uploadedImages.push(await cloudinary.uploader.upload(file, {tags: tags}))
  }
  return res.status(200).json(uploadedImages);
}

export async function removeByURLs(req, res, next) {
  const public_ids = req.body.map(url=>url.split('/').pop().split('.')[0])
  const resources = await cloudinary.api.delete_resources(public_ids);
  return res.status(200).json(resources);
}
