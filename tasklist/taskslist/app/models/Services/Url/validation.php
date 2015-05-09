<?php
namespace Services\Url;

use Services\Validation  as ValidationService;

class Validation extends ValidationService {

    /**
     * Validate a comment before publishing it.
     *
     * @throws ValidateException
     * @return void
     */
    public function publish()
    {
        $this->rules = array(
            'url'    => array('required'),
            'description'   => array('required', 'email')
        );

        $this->validate();
    }

}