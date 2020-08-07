const {
	camelCaseDash,
} = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );

const externals = {
	// This is necessary for Gutenberg to work.
	tinymce: "window.tinymce",

	yoastseo: "window.yoast.analysis",

	// General dependencies that we have.
	jed: "window.yoast.jed",
	lodash: "window.lodash",
	"lodash-es": "window.lodash",
	react: "React",
	"react-dom": "ReactDOM",
	redux: "window.yoast.redux",
	"react-redux": "window.yoast.reactRedux",
	"styled-components": "window.yoast.styledComponents",
	"draft-js": "window.yoast.draftJs",
};

/**
 * WordPress dependencies.
 */
const wordpressPackages = [
	"@wordpress/api-fetch",
	"@wordpress/block-editor",
	"@wordpress/blocks",
	"@wordpress/components",
	"@wordpress/compose",
	"@wordpress/data",
	"@wordpress/dom",
	"@wordpress/element",
	"@wordpress/html-entities",
	"@wordpress/edit-post",
	"@wordpress/i18n",
	"@wordpress/is-shallow-equal",
	"@wordpress/keycodes",
	"@wordpress/rich-text",
	"@wordpress/server-side-render",
	"@wordpress/url",
	"@wordpress/dom-ready",
	"@wordpress/a11y",
];

/**
 * Yoast dependencies, declared as such in the package.json.
 */
const { dependencies } = require( '../package' );
const legacyYoastPackages = [ 'yoast-components' ];

const YOAST_NAMESPACE = '@yoast/';

// Fetch all packages from the dependencies list.
const yoastPackages = Object.keys( dependencies )
	.filter(
		( packageName ) =>
			packageName.startsWith( YOAST_NAMESPACE ) ||
			legacyYoastPackages.includes( packageName )
	)
	.map( ( packageName ) => packageName.replace( YOAST_NAMESPACE, '' ) );

/**
 * Convert packages to externals configuration.
 */
// Yoast Packages.
const yoastExternals = yoastPackages.reduce( ( memo, packageName ) => {
	let useablePackageName = packageName;

	// Handle the difference between yoast-components and @yoast/components.
	useablePackageName = ( useablePackageName === 'components' ) ? 'components-new' : useablePackageName;
	useablePackageName = ( useablePackageName === 'yoast-components' ) ? 'components' : useablePackageName;

	// Handle yoastseo as analysis reference.
	useablePackageName = ( useablePackageName === 'yoastseo' ) ? 'analysis' : useablePackageName;

	memo[ packageName ] = `window.yoast.${ camelCaseDash( useablePackageName ) }`;
	return memo;
}, {} );

// WordPress packages.
const wordpressExternals = wordpressPackages.reduce( ( memo, packageName ) => {
	const name = camelCaseDash( packageName.replace( '@wordpress/', '' ) );

	memo[ packageName ] = `window.wp.${ name }`;
	return memo;
}, {} );

/**
 * Export the data.
 */
module.exports = {
	externals,
	yoastExternals,
	wordpressExternals,
}