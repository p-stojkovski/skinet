using Core.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions;

public class DomainException : Exception
{
    public DomainException(Error error)
        : base(error.Message)
        => Error = error;

    public Error Error { get; }
}
