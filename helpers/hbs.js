const moment = require('moment');

module.exports = {
    truncate: function(str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    select: function(selected, options) {
        return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
    },
    editIcon: function(gistUser, loggedUser, gistId, iconEdit = true) {
        if(gistUser == loggedUser) {
            if(iconEdit) {
                return `<a href="/gists/edit/${gistId}" class="btn btn-outline-info mr-2">Edit</a>`;
            } else {
                return `<a href="/gists/edit/${gistId}" class="small float-right text-primary pt-1" style="font-size: 70%"><i class="ion-edit mr-2"></i>Edit</a>`;
            }
        } else {
            return '';
        }
    }
}