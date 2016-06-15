import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import {Configuration} from 'configuration';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.use.plugin('aurelia-animator-css');

    var config = new Configuration('http://jsonplaceholder.typicode.com/', 4);
    aurelia.use.instance(Configuration, config);

    aurelia.start().then(() => aurelia.setRoot());
}