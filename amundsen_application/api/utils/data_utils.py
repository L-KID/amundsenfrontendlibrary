from typing import Dict

from amundsen_application.api.utils.request_utils import get_query_param


def get_table_key(args: Dict) -> str:
    db = get_query_param(args, 'db')
    cluster = get_query_param(args, 'cluster')
    schema = get_query_param(args, 'schema')
    table = get_query_param(args, 'table')
    table_key = '{db}://{cluster}.{schema}/{table}'.format(**locals())
    return table_key


# TODO - This logic should be done upstream, potentially as a module in amundsencommon
def marshall_table_partial(table: Dict) -> Dict:
    table_name = table.get('table_name')
    schema_name = table.get('schema')
    cluster = table.get('cluster')
    db = table.get('database')
    return {
        'cluster': cluster,
        'database': db,
        'description': table.get('table_description'),
        'key': '{0}://{1}.{2}/{3}'.format(db, cluster, schema_name, table_name),
        'name': table_name,
        'schema_name': schema_name,
        'type': 'table',
        'last_updated_epoch': table.get('last_updated_epoch', None),
    }
