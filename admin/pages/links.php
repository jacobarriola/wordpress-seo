<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin
 */

if ( ! defined( 'WPSEO_VERSION' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

$yform = Yoast_Form::get_instance();
$yform->admin_header( false );

$url = '';
if ( isset( $_GET['url'] ) ) {
	$url = filter_input( INPUT_GET, 'url', FILTER_SANITIZE_URL );
}

function object_edit_link( $object_id, $object_type, $object_sub_type ) {
    switch( $object_type ) {
        case 'post':
            return get_edit_post_link( $object_id );
        case 'term':
            return get_edit_term_link( $object_id, $object_sub_type );
    }
    return '';
}

// @todo this needs proper styling
?>
<div class="wpseo_content_wrapper">
<div class="wpseotab active">
<div class="paper tab-block search-appearance">
<div class="paper-container">
<h2><?php _e( 'Find links', 'wordpress-seo' ); ?></h2>

<?php
echo '<form method="get" action="' . admin_url( 'admin.php' ) . '">';
echo '<label for="url">' . __( 'Find links to:', 'wordpress-seo' ) . '</label> ';
echo '<input type="hidden" name="page" value="wpseo_links"/>';
echo '<input type="text" class="textinput" id="url" placeholder="' . __( 'URL or a part of a URL', 'wordpress-seo' ) . '" name="url" value="' . $url . '"><br>';
echo '<input type="submit" class="button" value="Find links"><br>';
echo '</form>';

if ( ! empty( $url ) ) {
    // @todo rewrite this to retrieve these results properly through the model instead of using a DB query.
	global $wpdb;
	$query = $wpdb->prepare( 'SELECT i.object_id, i.permalink, i.object_type, i.object_sub_type, i.breadcrumb_title FROM wp_yoast_seo_links l, wp_yoast_indexable i WHERE l.url LIKE "%%%s%%" AND l.indexable_id = i.id', $url );
	$results = $wpdb->get_results( $query );
	if ( count( $results ) > 0 ) {
		echo '<br><table class="wpseo">';
		echo '<tr><th>' . __( 'Edit', 'wordpress-seo' ) . '</th><th>' . __( 'Title', 'wordpress-seo' ) . '</th></tr>';
		foreach( $results as $result ) {
			echo '<tr><td>';
			echo '<a href="' . object_edit_link( $result->object_id, $result->object_type, $result->object_sub_type ) . '">' . __( 'Edit', 'wordpress-seo' ) . '</a>';
			echo '</td><td><a href="' . $result->permalink . '">' . $result->breadcrumb_title . '</a> <code>' . $result->object_sub_type . '</code></td></tr>';
		}
		echo '</table>';
	}
}
?>
</div>
</div>
    </div>
    </div>
<?php

$yform->admin_footer( false );
