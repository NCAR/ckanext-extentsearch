#
#  NOTE TO SAGE DEVELOPERS:  Helper functions MUST be registered in plugin.py to be usable in CKAN.
#
import ckan.logic as logic


def _get_data_dict_for_earliest_publication_year():
    """ Populates data_dict required for package_search API call from request parameters
    aka current search parameters """
    data_dict = {'q': '', 'fq': '', 'rows': 1, 'sort': 'publication_date asc'}
    return data_dict


def get_earliest_publication_year():
    """ Returns earliest publication year among all the records"""
    context = {}
    data_dict = _get_data_dict_for_earliest_publication_year()
    # Query the CKAN ACTION API to get a list of facets
    query = logic.get_action(u'package_search')(context, data_dict)
    earliest_publication_date = "1900-01-01"
    if query[u'results']:
        package_dict = query[u'results'][0]
        for extra in package_dict[u'extras']:
            if extra[u'key'] == u'publication_date':
                earliest_publication_date = extra[u'value']
    return earliest_publication_date[:4]
