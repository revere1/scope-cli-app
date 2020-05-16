import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { } from '@types/googlemaps';
declare var google: any;

@Injectable()
export class GeocodingService {

    geocoder: google.maps.Geocoder;
    mapLoaded: boolean = false;

    constructor(private __loader: MapsAPILoader) {

        try {
            //at this point the variable google may be still undefined (google maps scripts still loading)
            //so load all the scripts, then...
            this.__loader.load().then(() => {
                this.geocoder = new google.maps.Geocoder();
                this.mapLoaded = true;

            });
        } catch (error) {
            console.log("error loaing geocoder/maps may not show markers")
        }

    }


    getAddr = function (addr, f, org, service, router, save: boolean, orgProjects) {
        if (typeof addr != 'undefined' && addr != null) {
            this.geocoder.geocode({ address: addr, }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log('This is the geocoder status for getLatLan if ok ');
                    const place = results[0].geometry.location;

                    f('ok', place, org, service, router, save, orgProjects);
                } else {
                    f('error', null, org, service, router, save, orgProjects);
                }
            });
        } else {
            f('error', null);
        }
    }


    getLatLongDetail(myLatlng) {

        return Observable.create(observer => {
            try {

                this.geocoder.geocode({ 'location': myLatlng },
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {

                                var address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";
                                var lat;
                                var lng;

                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    var addr = results[0].address_components[i];
                                    // check if this entry in address_components has a type of country
                                    if (addr.types[0] == 'country')
                                        country = addr.long_name;
                                    else if (addr.types[0] == 'street_address') // address 1
                                        address = address + addr.long_name;
                                    else if (addr.types[0] == 'establishment')
                                        address = address + addr.long_name;
                                    else if (addr.types[0] == 'route')  // address 2
                                        address = address + addr.long_name;
                                    else if (addr.types[0] == 'postal_code')       // Zip
                                        zip = addr.short_name;
                                    else if (addr.types[0] === 'administrative_area_level_1')       // State
                                        state = addr.long_name;
                                    else if (addr.types[0] === 'locality')       // City
                                        city = addr.long_name;
                                }


                                if (results[0].formatted_address != null) {
                                    formattedAddress = results[0].formatted_address;
                                }

                                //debugger;

                                var location = results[0].geometry.location;

                                lat = location.lat();
                                lng = location.lng();

                                var addressObj = new Object();
                                addressObj['city'] = city;
                                addressObj['state'] = state;
                                addressObj['zip'] = zip;
                                addressObj['counry'] = country;
                                addressObj['address'] = address;
                                addressObj['formattedAddress'] = formattedAddress;
                                addressObj['lat'] = lat;
                                addressObj['lng'] = lng;


                                observer.next(addressObj);
                                observer.complete();

                            }

                        }

                    });

            } catch (x) {
                observer.error('error getGeocoding from positions' + x);
                observer.error(x);
                observer.complete();
            }
        })
    }


    getProjAddr = function (addr, f, org, strsvc, db, router, save: boolean, parent) {
        if (typeof addr != 'undefined' && addr != null) {
            this.geocoder.geocode({ address: addr, }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log('This is the geocoder status for getLatLan if ok ');
                    const place = results[0].geometry.location;

                    f('ok', place, org, strsvc, db, router, save, parent);
                } else {
                    f('error', null, org, strsvc, db, router, save, parent);
                }
            });
        } else {
            f('error', null);
        }
    }


    getAddress(x) {
        //alert('The positions are '+x.lat)
        var getAddressArray = [];
        var coordinateObj = {
            'lat': x.lat,
            'lng': x.lng
        }
        getAddressArray.push(coordinateObj)
        //console.log('These are the coordinates from array ' + JSON.stringify(getAddressArray))
        return Observable.create(observer => {
            try {
                console.log('This is the try block')
                let latlng = new google.maps.LatLng(x.lat, x.lng);
                let geocodeRequest: google.maps.GeocoderRequest = { 'location': latlng };
                geocodeRequest.location = latlng;
                this.geocoder.geocode(geocodeRequest, (results, status) => {
                    if (status) {
                        //console.log('This is the geocoder status for address if ok ');
                        observer.next(results[0].formatted_address);
                        observer.complete();
                    } else {
                        //console.log('This is the geocoder status for address if not ok')
                        observer.error(status);
                    }
                })
            } catch (x) {
                //console.log('This is the catch block')
                observer.error('error getGeocoding from positions' + x);
                observer.complete();
            }
        })
    }




}