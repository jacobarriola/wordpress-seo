<?php

namespace Yoast\WP\Free\Tests\Doubles\Presenters\Post_Type;

use Yoast\WP\Free\Presenters\Post_Type\Twitter_Image_Presenter;

/**
 * Test Helper Class.
 */
class Twitter_Image_Presenter_Double extends Twitter_Image_Presenter {

	/**
	 * Retrieves an attachment page's attachment url.
	 *
	 * @param string $post_id The ID of the post for which to retrieve the image.
	 *
	 * @return string The image url or an empty string when not found.
	 */
	public function retrieve_attachment_image( $post_id ) {
		return parent::retrieve_attachment_image( $post_id );
	}

	/**
	 * Retrieves the featured image url.
	 *
	 * @param int $post_id Post ID to use.
	 *
	 * @return string The image url or an empty string when not found.
	 */
	public function retrieve_featured_image( $post_id ) {
		return parent::retrieve_featured_image( $post_id );
	}

	/**
	 * Retrieves the first image url of a gallery.
	 *
	 * @param int $post_id Post ID to use.
	 *
	 * @return string The image url or an empty string when not found.
	 */
	public function retrieve_gallery_image( $post_id ) {
		return parent::retrieve_gallery_image( $post_id );
	}

	/**
	 * Retrieves the image url from the content.
	 *
	 * @param int $post_id The post id to extract the images from.
	 *
	 * @return string The image url or an empty string when not found.
	 */
	public function retrieve_content_image( $post_id ) {
		return parent::retrieve_content_image( $post_id );
	}
}
