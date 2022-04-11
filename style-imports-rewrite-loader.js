const loader = source => {
  // Tests for any imports of .css and .scss files that are imported
  // as a non-relative path with no sub-directories:
  // import "style.scss" => works
  // import "sub/style.css" => doesn't works
  const pattern = new RegExp(/(?<=("|'))(?=[^\/\n]+\.(s|)css("|'))/mg)

  // Prefixes the import strings with "src/style" directory
  return String(source).replace(pattern, 'src/style/')
}

module.exports = loader