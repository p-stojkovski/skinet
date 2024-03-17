using Core.Entities;
using Core.Messaging;
using LanguageExt.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Basket.Commands.SaveBasket;

public sealed record SaveBasketCommand(CustomerBasket CustomerBasket) : ICommand<Result<CustomerBasket>>;