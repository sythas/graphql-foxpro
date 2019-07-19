import * as edge from 'edge-js'
import { promisify } from 'util'

const query = promisify(edge.func(() => {/*
#r "System.Data.dll"

using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Dynamic;
using System.Linq;

async (sql) => {
    var rows = new List<dynamic>();
    string connectionString = @"Provider=vfpoledb.1;Data Source=C:\Dev\ivfp\data\Northwind.dbc;";
    using (var conn = new OleDbConnection(connectionString))
    {
        conn.Open();
        using (var command = new OleDbCommand(sql.ToString(), conn))
        {
            using (var reader = command.ExecuteReader())
            {
                var names = Enumerable.Range(0, reader.FieldCount).Select(reader.GetName).ToList();
                foreach (IDataRecord record in reader as IEnumerable)
                {
                    var expando = new ExpandoObject() as IDictionary<string, object>;
                    foreach (var name in names)
                        expando[name] = record[name];
                    
                    rows.Add(expando);
                }
            }
        }
    }
    return rows.ToArray();
}
*/}))

export default sql => query(sql)